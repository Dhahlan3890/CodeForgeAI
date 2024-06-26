import pathlib
import textwrap
import google.generativeai as genai

from IPython.display import display
from IPython.display import Markdown
import PIL.Image

# Framework selection (e.g., Tailwind, Bootstrap, etc.)
framework = "Regular CSS use flex grid etc"  # Change this to "Bootstrap" or any other framework as needed

def to_markdown(text):
  text = text.replace('•', '')
  return textwrap.indent(text, '', predicate=lambda _: True)

genai.configure(api_key="AIzaSyDDSwzN5o85ckkRVJXZEidq9zIPKIP8HtY")

generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"},
]

for m in genai.list_models():
  if 'generateContent' in m.supported_generation_methods:
    print(m.name)

model = genai.GenerativeModel('models/gemini-1.5-flash-latest', safety_settings=safety_settings, generation_config=generation_config)
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
  # print(response.text)
  return to_markdown(response.text)



# def send_message_to_model(text, img):
#     response = chat_session.send_message([text, img], stream=True)
#     return to_markdown(response.text)

def advanced_chat(image_path):
  chat_session = model.start_chat(history=[])
  img = PIL.Image.open(image_path)
  prompt = "Describe this UI in accurate details. When you reference a UI element put its name and bounding box in the format: [object name (y_min, x_min, y_max, x_max)]. Also Describe the color of the elements."
  description = chat_session.send_message([prompt, img])
  description = description.text
  print("description : ", description)
  refine_prompt = f"Compare the described UI elements with the provided image and identify any missing elements or inaccuracies. Also Describe the color of the elements. Provide a refined and accurate description of the UI elements based on this comparison. Here is the initial description: {description}"
  refined_description = chat_session.send_message([refine_prompt, img])
  refined_description = refined_description.text
  print("refined_description : ", refined_description)
  html_prompt = f"Create an HTML file based on the following UI description, using the UI elements described in the previous response. Include {framework} CSS within the HTML file to style the elements. Make sure the colors used are the same as the original UI. The UI needs to be responsive and mobile-first, matching the original UI as closely as possible. Do not include any explanations or comments. Avoid using ```html. and ``` at the end. ONLY return the HTML code with inline CSS. Here is the refined description: {refined_description}"
  initial_html = chat_session.send_message([html_prompt, img])
  initial_html = initial_html.text
  print("initial_html : ", initial_html)
  refine_html_prompt = f"Validate the following HTML code based on the UI description and image and provide a refined version of the HTML code with {framework} CSS that improves accuracy, responsiveness, and adherence to the original design. ONLY return the refined HTML code with inline CSS. Avoid using ```html. and ``` at the end. Here is the initial HTML: {initial_html}"
  refined_html = chat_session.send_message([refine_html_prompt, img])
  refined_html = refined_html.text

  return refined_html