from flask import Flask, json, request
from flask_cors import CORS

escrows = {}
api = Flask(__name__)
CORS(api)

@api.route('/list', methods=['GET'])
def get_deployed_escrows():
  print ("existing escrows:")
  print (escrows)

  return json.dumps(list(escrows.values()))

@api.route('/deploy', methods=['GET'])
def deploy_escrow():
  args = request.args.to_dict()
  if not verify_deployment(args):
    print ("The deployment did not work")
    print (args)
  else:
    contract = args['contract']
    args['approved'] = False
    escrows[contract] = args

    print("contract " + contract + " added.")
    print(args)
  
  return json.dumps(list(escrows.values()))

def verify_deployment(d):
  ks = d.keys()
  verified = True
  if 'contract' not in ks:
    print ("contract misssing")
    verified = False
  if 'depositor' not in ks:
    print ("depositor misssing")
    verified = False
  if 'arbiter' not in ks:
    print ("arbiter misssing")
    verified = False
  if 'beneficiary' not in ks:
    print ("beneficiary misssing")
    verified = False
  if 'value' not in ks:
    print ("value misssing")
    verified = False
  return verified

@api.route('/approve/<contract>', methods=['GET'])
def approve_escrow(contract):
  if contract in escrows.keys():
    escrows[contract]['approved'] = True

    print ('approved the escrow ' + contract)
    print (escrows[contract])
  else:
    print ("contract " + contract + " not found on the database.")

  return json.dumps(list(escrows.values()))

if __name__ == '__main__':
    api.run(port=8000)