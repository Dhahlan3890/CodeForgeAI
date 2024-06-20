import pathlib
import textwrap
import google.generativeai as genai

from IPython.display import display
from IPython.display import Markdown
import PIL.Image




def to_markdown(text):
  text = text.replace('•', '')
  return textwrap.indent(text, '', predicate=lambda _: True)

genai.configure(api_key="AIzaSyDDSwzN5o85ckkRVJXZEidq9zIPKIP8HtY")

for m in genai.list_models():
  if 'generateContent' in m.supported_generation_methods:
    print(m.name)

model = genai.GenerativeModel('models/gemini-1.5-flash-latest')
# chat = model.start_chat(history=[])
# chat

def chat(text):
    response = model.generate_content(text)
    # response = chat.send_message(text)

    return to_markdown(response.text)

def image_prompt(path):
  img = PIL.Image.open(path)
  response = model.generate_content(["Give me full css embbeded html code to create exact duplicate of provided scrennshot of a webpage. consider all the minor details and Put sime extra care on the positions of the components in the webpage. use multi plateform friendly designs. Dont give me wrong webpage.", img], stream=True)
  response.resolve()
  print(response.text)
  return to_markdown(response.text)