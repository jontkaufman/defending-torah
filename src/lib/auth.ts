"use server";

import { createClient } from "./supabase-server";
import { redirect } from "next/navigation";

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });
  if (error) return { error: error.message };
  redirect("/account");
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: { full_name: formData.get("name") as string },
      emailRedirectTo: `${siteUrl()}/login`,
    },
  });
  if (error) return { error: error.message };
  // With email confirmation enabled Supabase returns a user but no
  // session — the account isn't usable until the emailed link is clicked.
  if (!data.session) return { needsConfirmation: true };
  redirect("/account");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(
    formData.get("email") as string,
    { redirectTo: `${siteUrl()}/reset-password` }
  );
  if (error) return { error: error.message };
  return { success: true };
}

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
