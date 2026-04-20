"use server";

import { createClient } from "./supabase-server";
import { getUser } from "./auth";

export type CourseProgress = {
  id: string;
  user_id: string;
  course_id: string;
  status: "not-started" | "in-progress" | "finished";
  current_session_id: number | null;
  completed_sessions: number[];
  started_at: string | null;
  completed_at: string | null;
};

export async function getCourseProgress(courseId: string): Promise<CourseProgress | null> {
  const user = await getUser();
  if (!user) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("course_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("course_id", courseId)
    .single();
  return data as CourseProgress | null;
}

export async function startCourse(courseId: string): Promise<void> {
  const user = await getUser();
  if (!user) return;
  const supabase = await createClient();
  await supabase.from("course_progress").upsert({
    user_id: user.id,
    course_id: courseId,
    status: "in-progress",
    current_session_id: 1,
    completed_sessions: [],
    started_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }, { onConflict: "user_id,course_id" });
}

export async function completeSession(courseId: string, sessionId: number, totalSessions: number): Promise<void> {
  const user = await getUser();
  if (!user) return;
  const supabase = await createClient();
  const progress = await getCourseProgress(courseId);
  if (!progress) return;

  const completed = [...new Set([...(progress.completed_sessions || []), sessionId])];
  const nextSession = sessionId < totalSessions ? sessionId + 1 : sessionId;
  const isFinished = completed.length >= totalSessions;

  await supabase.from("course_progress").update({
    completed_sessions: completed,
    current_session_id: nextSession,
    status: isFinished ? "finished" : "in-progress",
    completed_at: isFinished ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  }).eq("id", progress.id);
}

export async function resetCourse(courseId: string): Promise<void> {
  const user = await getUser();
  if (!user) return;
  const supabase = await createClient();
  await supabase.from("course_progress").update({
    status: "in-progress",
    current_session_id: 1,
    completed_sessions: [],
    started_at: new Date().toISOString(),
    completed_at: null,
    updated_at: new Date().toISOString(),
  }).eq("user_id", user.id).eq("course_id", courseId);
}

export async function submitCapstone(courseId: string, format: string, content: string): Promise<void> {
  const user = await getUser();
  if (!user) return;
  const supabase = await createClient();
  await supabase.from("capstone_submissions").upsert({
    user_id: user.id,
    course_id: courseId,
    format,
    content_text: format !== "recorded" ? content : null,
    content_url: format === "recorded" ? content : null,
    submitted_at: new Date().toISOString(),
  }, { onConflict: "user_id,course_id" });
}

export async function getCapstoneSubmission(courseId: string): Promise<{ id: string; format: string; content: string; submitted_at: string } | null> {
  const user = await getUser();
  if (!user) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("capstone_submissions")
    .select("*")
    .eq("user_id", user.id)
    .eq("course_id", courseId)
    .single();
  return data;
}
