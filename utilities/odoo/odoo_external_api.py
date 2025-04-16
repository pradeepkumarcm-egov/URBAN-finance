import xmlrpc.client
import os
from dotenv import load_dotenv
import json
import requests

# Load .env variables
load_dotenv()

odoo_url = os.getenv('ODOO_URL')
odoo_user = os.getenv('ODOO_USER')
odoo_password = os.getenv('ODOO_PASSWORD')
odoo_db = os.getenv('ODOO_DB')

MDMS_HOST = os.getenv('MDMS_HOST')
MDMS_CREATE = os.getenv('MDMS_CREATE')

print("URL:", odoo_url)
print("USER:", odoo_user)
print("PASS:", odoo_password)
print("DB:", odoo_db)

def transform_to_mdms_request(record):

    temp_city = record.get('x_studio_city', [None, 'pg'])
    if isinstance(temp_city, list) and len(temp_city) > 0:
        tenant_id = temp_city[1]
    unique_identifier = record.get('x_name').replace(' ', '_').upper()
    # print("tenant_id----->", tenant_id)
    # print("unique_identifier----->", unique_identifier)
    business_service = record.get('x_studio_category_2', [None, 'pg'])
    if isinstance(business_service, list) and len(business_service) > 1:
        business_service = business_service[1].replace(' ', '').upper()
    # print("business_service----->", business_service)
    mdms_data = {
                "tenantId": 'pg',
                "schemaCode": "BillingService.BusinessService",
                "uniqueIdentifier": unique_identifier,
                "data": {
                    "code": unique_identifier,
                    "businessService": business_service,
                    "demandUpdateTime": 123456789,
                    "isAdvanceAllowed": False,
                    "partPaymentAllowed": False,
                    "isVoucherCreationEnabled": True,
                    "collectionModesNotAllowed": [
                        "DD",
                        "OFFLINE_NEFT",
                        "OFFLINE_RTGS",
                        "POSTAL_ORDER"
                    ]
                },
                "isActive": True
            }
    return mdms_data

def external_api_calling(mdms_data):
    # print(json.dumps(mdms_data, indent=2))
    try:
        schemaCode = mdms_data["schemaCode"]
        print(schemaCode)
        host = MDMS_HOST + os.getenv('MDMS_CREATE') +"/"+ schemaCode
        print(host)
        request_payload = {"apiId": "Rainmaker","authToken": "3bb0c045-6e5c-4002-8504-6069bf20a5ba","userInfo": {"id": 271,"uuid": "81b1ce2d-262d-4632-b2a3-3e8227769a11","userName": "MUKTAUAT","name": "MUKTAUAT","mobileNumber": "9036774122","emailId": None,"locale": None,"type": "EMPLOYEE","roles": [{"name": "ESTIMATE APPROVER","code": "ESTIMATE_APPROVER","tenantId": "od.testing"},{"name": "WORK ORDER CREATOR","code": "WORK_ORDER_CREATOR","tenantId": "od.testing"},{"name": "Organization viewer","code": "ORG_VIEWER","tenantId": "od.testing"},{"name": "MB_VERIFIER","code": "MB_VERIFIER","tenantId": "od.testing"},{"name": "ESTIMATE CREATOR","code": "ESTIMATE_CREATOR","tenantId": "od.testing"},{"name": "MDMS Admin","code": "MDMS_ADMIN","tenantId": "od.testing"},{"name": "MB_VIEWER","code": "MB_VIEWER","tenantId": "od.testing"},{"name": "State Dashboard Admin","code": "STADMIN","tenantId": "od.testing"},{"name": "MUKTA Admin","code": "MUKTA_ADMIN","tenantId": "od.testing"},{"name": "Employee Common","code": "EMPLOYEE_COMMON","tenantId": "od.testing"},{"name": "TECHNICAL SANCTIONER","code": "TECHNICAL_SANCTIONER","tenantId": "od.testing"},{"name": "BILL_CREATOR","code": "BILL_CREATOR","tenantId": "od.testing"},{"name": "BILL_ACCOUNTANT","code": "BILL_ACCOUNTANT","tenantId": "od.testing"},{"name": "WORK_ORDER_VIEWER","code": "WORK_ORDER_VIEWER","tenantId": "od.testing"},{"name": "BILL_VERIFIER","code": "BILL_VERIFIER","tenantId": "od.testing"},{"name": "ESTIMATE VERIFIER","code": "ESTIMATE_VERIFIER","tenantId": "od.testing"},{"name": "MUSTER ROLL APPROVER","code": "MUSTER_ROLL_APPROVER","tenantId": "od.testing"},{"name": "ESTIMATE VIEWER","code": "ESTIMATE_VIEWER","tenantId": "od.testing"},{"name": "WORK ORDER APPROVER","code": "WORK_ORDER_APPROVER","tenantId": "od.testing"},{"name": "MB_APPROVER","code": "MB_APPROVER","tenantId": "od.testing"},{"name": "MDMS CITY ADMIN","code": "MDMS_CITY_ADMIN","tenantId": "od.testing"},{"name": "OFFICER IN CHARGE","code": "OFFICER_IN_CHARGE","tenantId": "od.testing"},{"name": "PROJECT CREATOR","code": "PROJECT_CREATOR","tenantId": "od.testing"},{"name": "BILL_VIEWER","code": "BILL_VIEWER","tenantId": "od.testing"},{"name": "WORK ORDER VERIFIER","code": "WORK_ORDER_VERIFIER","tenantId": "od.testing"},{"name": "PROJECT VIEWER","code": "PROJECT_VIEWER","tenantId": "od.testing"},{"name": "BILL_APPROVER","code": "BILL_APPROVER","tenantId": "od.testing"},{"name": "MB_CREATOR","code": "MB_CREATOR","tenantId": "od.testing"},{"name": "MUSTER ROLL VERIFIER","code": "MUSTER_ROLL_VERIFIER","tenantId": "od.testing"},{"name": "HRMS Admin","code": "HRMS_ADMIN","tenantId": "od.testing"}],"active": True,"tenantId": "od.testing","permanentCity": "Testing"},"msgId": "1705908972414|en_IN","plainAccessRequest": {}}
        headers = {"Content-Type": "application/json"}
        api_payload = {"Mdms": mdms_data,"RequestInfo": request_payload}
        print(json.dumps(api_payload, indent=2))
        response = requests.post(host, json=api_payload, headers=headers)
        print(response.text)
        models.execute_kw(odoo_db, uid, odoo_password, 'x_type', 'write', [record['id'], {'x_studio_migrated': True}]) # mark it migrated

    except Exception as e:
        raise e

common = xmlrpc.client.ServerProxy('{}/xmlrpc/2/common'.format(odoo_url))
print(common.version())

uid = common.authenticate(odoo_db, odoo_user, odoo_password, {})

if uid:
    print("Authentication successful. UID:", uid)
    models = xmlrpc.client.ServerProxy('{}/xmlrpc/2/object'.format(odoo_url))

    #search
    ids = models.execute_kw(odoo_db, uid, odoo_password, 'x_type', 'search', [[['x_active', '=', True]]])
    # print("ids---->", ids)

    #read
    records = models.execute_kw(odoo_db, uid, odoo_password, 'x_type', 'read', [ids], {'fields': ['id', 'x_name', 'x_studio_category_2', 'x_studio_migrated', 'x_studio_city']})
    # print("records---->", records)

    for record in records:
        print(record['id'], record['x_name'], record['x_studio_category_2'], record['x_studio_migrated'], record['x_studio_city'])
        if record['x_studio_migrated'] == True:
            # models.execute_kw(odoo_db, uid, odoo_password, 'x_type', 'write', [record['id'], {'x_studio_migrated': False}])
            continue
        else: 
            mdms_data = transform_to_mdms_request(record)
            try:
                external_api_calling(mdms_data)
            except Exception as e:
                raise e
            # break

else:
    print("Authentication failed.", common)