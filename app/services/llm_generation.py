import os
from typing import List, Dict
from dotenv import load_dotenv

try:
    from google import genai
    from google.genai import types
except Exception:
    genai = None
    types = None

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

_client = None
if GEMINI_API_KEY and genai is not None:
    try:
        _client = genai.Client(api_key=GEMINI_API_KEY)
    except Exception:
        _client = None


def _fallback_response(query: str, employees: List[Dict]) -> str:
    if not employees:
        return (
            "I couldn't find matching candidates right now. "
            "Try refining your query with skills, experience, or project keywords."
        )

    lines = [
        "Here are recommended candidates based on your query:",
    ]
    for emp in employees:
        name = emp.get("name", "Unknown")
        experience = emp.get("experience_years", 0)
        skills = ", ".join(emp.get("skills", []))
        projects = ", ".join(emp.get("projects", []))
        availability = emp.get("availability", "unknown")
        lines.append(
            f"- {name}: {experience} yrs exp | Skills: {skills} | Projects: {projects} | {availability}"
        )
    lines.append(
        "Let me know if you want me to filter further by years of experience, tech stack, or domain."
    )
    return "\n".join(lines)


def generate_response(query: str, employees: List[Dict]) -> str:
    """Generate a natural-language recommendation for candidates.

    Uses Gemini when configured; otherwise falls back to a deterministic template.
    """
    if _client is None or types is None:
        return _fallback_response(query, employees)

    profiles_text = ""
    for emp in employees:
        name = emp.get("name", "Unknown")
        experience = emp.get("experience_years", 0)
        skills = ", ".join(emp.get("skills", []))
        projects = ", ".join(emp.get("projects", []))
        availability = emp.get("availability", "unknown")

        profiles_text += (
            f"{name} has {experience} years of experience. "
            f"Skills include {skills}. "
            f"Worked on projects such as {projects}. "
            f"Currently {availability}.\n\n"
        )

    prompt = (
        "You are an HR assistant. The user query is: \""
        + query
        + "\". Based on the following employee profiles:\n"
        + profiles_text
        + "Generate a professional, concise recommendation of the best candidates."
    )

    try:
        config = types.GenerateContentConfig(
            thinking_config=types.ThinkingConfig(thinking_budget=0)
        )
        response = _client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=config,
        )
        return getattr(response, "text", None) or _fallback_response(query, employees)
    except Exception:
        return _fallback_response(query, employees)
