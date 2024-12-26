import os
import hashlib
import requests
import io
from pathlib import Path
from PIL import Image
from bs4 import BeautifulSoup

# Array of dieren
dieren = [
    "Hond", "Kat", "Paard", "Koe", "Schaap", "Varken", "Kip", "Konijn", "Goudvis", 
    "Olifant", "Leeuw", "Tijger", "Zebra", "Giraf", "Pinguïn", "Flamingo", "Dolfijn", 
    "Schildpad", "Kameleon", "Toekan", "Alpaca", "Stekelvarken", "Wasbeer", "Egel", 
    "Bever", "Miereneter", "Reuzenpanda", "Zwaardvis", "Kolibrie", "Ringstaartmaki", 
    "Emoe", "Zeehond", "IJsbeer", "Coati", "Walrus", "Tapir", "Mara", "Capibara", 
    "Gibbon", "Bonobo", "Axolotl", "Quokka", "Narwal", "Kakapo", "Manenwolf", 
    "Fossa", "Blauwvinvis", "Saiga-antilope", "Shoebill", "Tarsier"
]

# Create output directory 'dieren'
output_dir = Path("dieren")
output_dir.mkdir(exist_ok=True)

def fetch_and_save_image(query):
    search_url = f"https://duckduckgo.com/?q={query}+dier&t=h_&iax=images&ia=images"
    headers = {"User-Agent": "Mozilla/5.0"}
    
    # Fetch the DuckDuckGo search page
    response = requests.get(search_url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")
    
    # Find the first image URL (based on the assumption it's in the 'img' tag)
    img_tag = soup.find("img")
    if img_tag and "src" in img_tag.attrs:
        img_url = img_tag["src"]
        
        # Download the image content
        image_content = requests.get(img_url).content
        image_file = io.BytesIO(image_content)
        image = Image.open(image_file).convert("RGB")
        
        # Generate unique filename
        # file_hash = hashlib.sha1(image_content).hexdigest()[:10]
        file_path = output_dir / f"{query}.png"
        
        # Save the image
        image.save(file_path, "PNG")
        print(f"Saved: {file_path}")
    else:
        print(soup)
        print(f"Image not found for: {query}")

if __name__ == "__main__":
    for dier in dieren:
        fetch_and_save_image(dier)
