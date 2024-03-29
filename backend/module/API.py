from google.cloud import vision
import io
from google.cloud import translate
from .utils import clean_text


def detect_text(path):
    """Detects text in the file."""

    client = vision.ImageAnnotatorClient()

    with io.open(path, "rb") as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    response = client.text_detection(image=image)
    if response.error.message:
        raise Exception(
            "{}\nFor more info on error messages, check: "
            "https://cloud.google.com/apis/design/errors".format(response.error.message)
        )
    texts = response.text_annotations[0]
    texts_cleaned = clean_text(texts.description)
    detected_language = texts.locale

    print("texts_cleaned: ", texts_cleaned)
    return texts_cleaned, detected_language


# Initialize Translation client
def translate_text(text, language, project_id="myproject-capston"):
    """Translating Text."""

    client = translate.TranslationServiceClient()

    location = "global"

    parent = f"projects/{project_id}/locations/{location}"

    # Translate text from English to French
    # Detail on supported types can be found here:
    # https://cloud.google.com/translate/docs/supported-formats
    if language != "ko":
        response = client.translate_text(
            request={
                "parent": parent,
                "contents": [text],
                "mime_type": "text/plain",  # mime types: text/plain, text/html
                "source_language_code": "en-US",
                "target_language_code": "ko",
            }
        )

        # Display the translation for each input text provided
        for translation in response.translations:
            print("Translated text: {}".format(translation.translated_text))
        return translation.translated_text
    return text
