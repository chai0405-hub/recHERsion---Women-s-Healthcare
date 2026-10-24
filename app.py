"""Sakhi Health on Streamlit.

The app itself is the static HTML/CSS/JS in this repo (no backend). This file
inlines those files and serves them inside Streamlit, so the same app runs with:

    pip install -r requirements.txt
    streamlit run streamlit_app.py

Everything still runs in the visitor's browser: health data never reaches the
Streamlit server. Voice input needs microphone permission for the embedded
frame; if the browser blocks it, use the 'Open full app' link on the page or
tick symptoms by hand.
"""
from pathlib import Path
import streamlit as st
import streamlit.components.v1 as components

ROOT = Path(__file__).parent


def build_page() -> str:
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    css = (ROOT / "css" / "style.css").read_text(encoding="utf-8")
    html = html.replace('<link rel="stylesheet" href="css/style.css">', f"<style>{css}</style>")
    for name in ("data", "auth", "voice", "app"):
        js = (ROOT / "js" / f"{name}.js").read_text(encoding="utf-8")
        html = html.replace(f'<script src="js/{name}.js"></script>', f"<script>{js}</script>")
    return html


st.set_page_config(page_title="Sakhi Health", page_icon="🌸", layout="wide")
st.markdown(
    """
    <style>
      #MainMenu, footer, header {visibility: hidden;}
      .block-container {padding-top: 0.5rem; padding-bottom: 0; max-width: 100%;}
    </style>
    """,
    unsafe_allow_html=True,
)

components.html(build_page(), height=1400, scrolling=True)
st.caption(
    "Sakhi Health is not a medical device and does not diagnose. Your entries stay "
    "in this browser; nothing is sent to the server."
)
