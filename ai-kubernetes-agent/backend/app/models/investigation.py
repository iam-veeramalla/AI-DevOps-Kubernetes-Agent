from pydantic import BaseModel


class InvestigationResult(BaseModel):
    status: str = "ready"

