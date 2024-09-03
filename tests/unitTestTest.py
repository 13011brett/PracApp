import json
import sys
sys.path.append('src/microservices')
from operations import up_or_down

data = json.loads(sys.argv[1])
result = up_or_down(data)
print(result)