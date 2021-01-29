FROM python:slim

RUN apt-get update
RUN pip3 install flask flask-cors requests pymongo

RUN mkdir -p /usr/src/app

COPY . /usr/src/app

WORKDIR /usr/src/app

CMD ["python3", "endpoints.py"]
