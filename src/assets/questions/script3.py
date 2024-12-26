from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
import time

# Setup Chrome options (headless if needed)
options = webdriver.ChromeOptions()
# options.add_argument("--headless")  # Remove this line if you want to see the browser
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--disable-notifications")  # Disable notification prompts
options.add_argument("--disable-extensions")  # Disable extensions that might interfere
options.add_argument("--disable-popup-blocking")  # Prevent popup blocking

path='C:\\Users\\arno_\\Downloads\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe'

monuments = [
        "Michael Jackson", "Queen", "The Beatles", "Coldplay", "Ed Sheeran", "Beyoncé", "Rihanna",
        "Adele", "Taylor Swift", "Eminem", "Bruno Mars", "The Rolling Stones", "Kanye West", "Justin Bieber",
        "Lady Gaga", "The Weeknd", "Ariana Grande", "Linkin Park", "Foo Fighters", "Green Day", "Imagine Dragons",
        "Shawn Mendes", "Dua Lipa", "Billie Eilish", "U2", "Metallica", "Red Hot Chili Peppers", "Nirvana", 
        "Oasis", "Blink-182", "The Killers", "Maroon 5", "Kings of Leon", "OneRepublic", "Avicii", "Sam Smith", 
        "Post Malone", "Harry Styles", "David Guetta", "Calvin Harris", "Ellie Goulding", "Sia", "The Script", 
        "Florence + The Machine", "Mumford & Sons", "Arctic Monkeys", "Selena Gomez", "The Chainsmokers", 
        "Major Lazer", "Kygo", "Drake"
    ];


# Initialize the WebDriver
driver = webdriver.Chrome(service=Service(path), options=options)


def fetch_and_save_image(query):
    # Open the DuckDuckGo search for an animal (example: "Hond")
    driver.get("https://duckduckgo.com")
    driver.delete_all_cookies()
    driver.get(f"https://duckduckgo.com/?q=&(artiest)+{query}+portret&t=h_&iax=images&ia=images")

    # Wait for the page to load and images to render
    time.sleep(5)  # Adjust the sleep time if necessary

    # Scroll down to load more images (for lazy-loading)
    # driver.find_element(By.TAG_NAME, "body").send_keys(Keys.END)
    # time.sleep(5)  # Wait for additional images to load

    # Collect all image elements after rendering
    img_elements = driver.find_elements(By.TAG_NAME, "img")

    # Extract valid image URLs
    valid_img_urls = []
    for img in img_elements:
        img_url = img.get_attribute("src")
        if img_url and not img_url.startswith("data:image"):
            valid_img_urls.append(img_url)

    # Print and download the first valid image (example)
    if valid_img_urls:
        print(f"First valid image URL: {valid_img_urls[0]}")
        import requests 
        response = requests.get(valid_img_urls[0])
        file_path = f"artiesten/{query}.png"
        with open(file_path, "wb") as file:
            file.write(response.content)

if __name__ == "__main__":
    for dier in monuments:
        fetch_and_save_image(dier)

# Close the browser
driver.quit()
