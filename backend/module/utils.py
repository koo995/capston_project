from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from boom.models import Post
import re


def clean_text(text):
    text = re.sub(r"\n", " ", text)  # Replace newline characters with spaces
    return text.strip()  # Remove leading and trailing spaces


def calculate_text_similarity(text1, text2):
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform([text1, text2])
    similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])

    return similarity[0][0]


def find_similar_posts(new_post, similarity_threshold=0.25):
    similar_posts = []

    all_posts = Post.objects.exclude(
        pk=new_post.pk
    )  # Exclude the new post from the query

    for post in all_posts:
        if post.ocr_text is not None:
            similarity = calculate_text_similarity(new_post.ocr_text, post.ocr_text)
            if similarity >= similarity_threshold:
                similar_posts.append(post)

    return similar_posts
