FROM alpine
RUN apk add python3
WORKDIR /App
COPY . /App
CMD ["python3", "-m","http.server","8000"]