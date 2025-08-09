import json
from pathlib import Path

def load_employee_data(file_path:str)-> list[dict]:
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"Employee dataset not found at: {file_path}")
    
    with open(path,"r",encoding="utf-8") as f:
        data = json.load(f)

    if "employees" not in data:
        raise ValueError("Invalid dataset format. Expected top-level 'employees' key.")

    return data["employees"]
    
def convert_to_sentences(employees: list[dict]) -> list[tuple[int, str]]:
    sentences = []
    for emp in employees:
        emp_id = emp.get("id")
        name = emp.get("name", "Unknown")
        skills = ", ".join(emp.get("skills", []))
        experience = emp.get("experience_years", 0)
        projects = ", ".join(emp.get("projects", []))
        availability = emp.get("availability", "unknown")

        sentence = (
            f"{name} has {experience} years of experience. "
            f"Skills include {skills}. "
            f"Worked on projects such as {projects}. "
            f"Currently {availability}."
        )

        sentences.append((emp_id, sentence.strip()))

    return sentences

def load_and_prepare_sentences(file_path: str) -> list[tuple[int, str]]:
    employees = load_employee_data(file_path)
    return convert_to_sentences(employees)