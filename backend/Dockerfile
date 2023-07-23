FROM ubuntu:20.04

RUN apt-get update && apt-get install -y python3-pip && apt-get clean

WORKDIR /djangoproject

ADD . /djangoproject
RUN pip3 install -r requirements.txt

RUN which gunicorn || echo gunicorn not found

EXPOSE 8000
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:80"]

# 도커파일도 git에 올려서 저장할 것이니까 중요한건 적으면 안된다.