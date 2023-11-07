import os

os.environ["GOOGLE_CSE_ID"] = "c1a16313a9c2547a1x"
os.environ["GOOGLE_API_KEY"] = "AIzaSyDL1e5VfAsWDwJc3dL5C0cs9F3gt39Euu0x"

from langchain.tools import Tool
from langchain.utilities import GoogleSearchAPIWrapper

search = GoogleSearchAPIWrapper()

query = "How can I obtain a temporary residence card in Poland?"

print(search.results(query, 3))