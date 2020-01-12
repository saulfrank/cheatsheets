FROM python:3.7
COPY requirements.txt .
RUN pip3 install -r requirements.txt
COPY main.py .
EXPOSE 8080
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--workers","2", "--port", "8080"]