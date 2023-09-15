# tcserver

Put your own OpenAI key in ./src/.env

From example:

  curl http://localhost:4000/api/trxtype/?trxTypeCommand="Let me check those records of PG Issuance"

Then we will get response from OpenAI:
  {"success":true,"data":{"trxType":"BG Issuance"}}