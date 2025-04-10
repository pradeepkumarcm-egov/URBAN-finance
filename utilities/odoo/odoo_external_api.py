import xmlrpc.client

url = 'https://demo-test360.odoo.com'
user_name = 'lokendra.tyagi@egovernments.org'
password = 'f7380013b3ca9b9023baedca7bb6b49d7ec865c2'
db = 'demo-test360'

common = xmlrpc.client.ServerProxy('{}/xmlrpc/2/common'.format(url))
print(common.version())

uid = common.authenticate(db, user_name, password, {})

if uid:
    print("Authentication successful. UID:", uid)
else:
    print("Authentication failed.", common)


models = xmlrpc.client.ServerProxy('{}/xmlrpc/2/object'.format(url))

#search
ids = models.execute_kw(db, uid, password, 'x_type', 'search', [[['x_active', '=', True]]])
print("ids---->", ids)

#search_count
count = models.execute_kw(db, uid, password, 'x_type', 'search_count', [[['x_active', '=', True]]])
print("count---->", count)

#read
records = models.execute_kw(db, uid, password, 'x_type', 'read', [ids], {'fields': ['id', 'x_name', 'x_studio_category_1', 'x_studio_migrated']})
print("records---->", records)

# # list records
# list = models.execute_kw(db, uid, password, 'x_complaints', 'fields_get', [], {'attributes': ['string', 'help', 'category']})
# print("list---->", list)

# #search_read
# search_read = models.execute_kw(db, uid, password, 'x_complaints', 'search_read', [[['x_active', '=', True]]], {'fields': ['id'], 'limit': 5})
# print("search_read---->", search_read)

# #create 
# id = models.execute_kw(db, uid, password, 'x_complaints', 'create', [{'x_name': "complaint 3", 'x_active': True}])
# print("id---->", id)

#update
models.execute_kw(db, uid, password, 'x_type', 'write', [[13,14,15,16,17,18], {'x_studio_migrated': False}])
# get record name after having changed it
read_after_update = models.execute_kw(db, uid, password, 'x_type', 'read', [[13], ['display_name', 'x_studio_migrated']])
print("read---->", read_after_update)

#delete
# models.execute_kw(db, uid, password, 'x_complaints', 'unlink', [[5]])
# # check if the deleted record is still in the database
# read_after_delete = models.execute_kw(db, uid, password, 'x_complaints', 'search', [[['id', '=', id]]])
# print("read_after_delete---->", read_after_delete)