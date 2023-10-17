import sqlite3

conn = sqlite3.connect('S://pipeline_job/job_queue.db')
cursor = conn.cursor()

# Create table to store jobs
cursor.execute('''
    CREATE TABLE IF NOT EXISTS jobs (
        id INTEGER PRIMARY KEY,
        date_val DATE,
        technician TEXT,
        platform TEXT,
        extrude TEXT,
        add_jig TEXT,
        generate TEXT,
        do_segment TEXT,
        trim_percent TEXT,
        smoothing_dev TEXT,
        back_smoothing_dev TEXT,
        offset_val TEXT
    )
''')

conn.commit()





