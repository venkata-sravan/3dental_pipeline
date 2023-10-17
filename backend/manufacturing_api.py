from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
from starlette.middleware.cors import CORSMiddleware
import DataBaseManagement

app = FastAPI()

# Configure CORS
origins = ["*"]  # Adjust the origins as needed

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Temporary in-memory data store
job_queue = []


class Job(BaseModel):
    date: str
    user: str
    platform: str
    activity: dict
    do_segment: Optional[bool] = False
    trim_percentage: Optional[str] = None
    smoothing_deviation: Optional[str] = None
    back_smoothing_deviation: Optional[str] = None
    offset: Optional[str] = None


class Job_type(BaseModel):
    id: int
    date: str
    user: str
    platform: str
    extrude: bool
    add_jig: bool
    trim_line: bool
    do_segment: Optional[bool] = False
    trim_percentage: Optional[str] = None
    smoothing_deviation: Optional[str] = None
    back_smoothing_deviation: Optional[str] = None
    offset: Optional[str] = None


@app.get("/jobs", response_model=List[Job_type])
def read_jobs():
    return DataBaseManagement.get_all_jobs()


@app.post("/jobs")
def add_job(job: Job):
    DataBaseManagement.insert_job(job)
    return {"message": "Job added successfully"}


@app.put("/jobs/{job_id}")
def update_job(job_id, job: Job_type):
    print(job)
    DataBaseManagement.update_job(job_id, job)
    return {"message": "Job Updated successfully"}


@app.get("/jobs/{job_id}", response_model=Job_type)
def get_job(job_id):
    return DataBaseManagement.get_job(job_id)


@app.delete("/jobs/{job_id}")
def get_job(job_id):
    return DataBaseManagement.delete_job(job_id)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
