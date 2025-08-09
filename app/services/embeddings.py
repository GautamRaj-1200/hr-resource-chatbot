from sentence_transformers import SentenceTransformer
model = SentenceTransformer("all-MiniLM-L6-v2")

def embed_sentences(employee_sentences: list[tuple[int, str]]):
    sentences_only = [s for _, s in employee_sentences]

    embeddings = model.encode(sentences_only)

    return embeddings
