import sqlite3

from backend.manufacturing_api import Job, Job_type


def connect():
    conn = sqlite3.connect('S://pipeline_job/job_queue.db')
    return conn


def insert_job(job):
    conn = connect()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO jobs (date_val, technician, platform, extrude, add_jig, generate, do_segment, '
                   'trim_percent, smoothing_dev, back_smoothing_dev, offset_val) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
                   (job.date, job.user, job.platform, job.activity['extrude'], job.activity['add_jig'],
                    job.activity['trim_line'], job.do_segment, job.trim_percentage,
                    job.smoothing_deviation, job.back_smoothing_deviation, job.offset))
    conn.commit()


def get_all_jobs():
    conn = connect()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM jobs')
    data = cursor.fetchall()
    jobs = []
    for row in data:
        job = Job_type(id=row[0], date=row[1], user=row[2], platform=row[3], extrude=row[4], add_jig=row[5],
                       trim_line=row[6],
                       do_segment=row[7], trim_percentage=row[8], smoothing_deviation=row[9],
                       back_smoothing_deviation=row[10], offset=row[11])
        jobs.append(job)
    return jobs


def update_job(job_id, job: Job_type):
    conn = connect()
    cursor = conn.cursor()
    cursor.execute(
        'UPDATE jobs SET date_val=?, technician=?, platform=?, extrude=?, add_jig=?, generate=?, do_segment=?, '
        'trim_percent=?, smoothing_dev=?, back_smoothing_dev=?, offset_val=? WHERE id=?',
        (job.date, job.user, job.platform, job.extrude, job.add_jig, job.trim_line, job.do_segment, job.trim_percentage,
         job.smoothing_deviation, job.back_smoothing_deviation, job.offset, job_id)
    )
    conn.commit()


def get_job(job_id):
    conn = connect()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM jobs WHERE id=?', (job_id,))
    row = cursor.fetchall()[0]
    job = Job_type(id=row[0], date=row[1], user=row[2], platform=row[3], extrude=row[4], add_jig=row[5],
                   trim_line=row[6],
                   do_segment=row[7], trim_percentage=row[8], smoothing_deviation=row[9],
                   back_smoothing_deviation=row[10], offset=row[11])
    return job


def delete_job(job_id):
    conn = connect()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM jobs WHERE id=?', (job_id,))
    conn.commit()
    print("Job deleted successfully")
