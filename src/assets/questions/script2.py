import requests
from bs4 import BeautifulSoup
import os
import urllib

def download_image(query):
    # Create the URL for Google image search
    search_url = f"https://duckduckgo.com/?q={query}+dier&t=h_&iax=images&ia=images"
    # search_url = f"https://www.google.com/search?hl=en&tbm=isch&q={urllib.parse.quote(query)}"
    
    # Send a request to fetch the content of the page
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    response = requests.get(search_url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find all image elements
    img_tags = soup.find_all('img')
    
    # The first image in the results is the one we're looking for
    if img_tags:
        img_url = None
        index = 0

        while index < len(img_tags):
            img_tag = img_tags[index]
            img_url = img_tag.get('src')  # Use .get() to avoid KeyError        
            if img_url:  # Break if a valid 'src' is found
                break
            index += 1
        # Download the image
        img_response = requests.get(img_url, headers=headers)
        
        # Define the image filename
        filename = query.replace(" ", "_") + "_first_image.jpg"
        
        # Save the image to the current directory
        with open(filename, 'wb') as img_file:
            img_file.write(img_response.content)
        
        print(f"Image saved as {filename}")
    else:
        print("No image found for the query.")

# Example usage:
query = "koala"
download_image(query)