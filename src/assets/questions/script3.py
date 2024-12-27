from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
import time

# Setup Chrome options (headless if needed)
options = webdriver.ChromeOptions()
options.add_argument("--headless")  # Remove this line if you want to see the browser
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--disable-extensions")  # Disable extensions that might interfere
options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36")
options.add_argument("--disable-popup-blocking")
options.add_argument("--disable-notifications")

path='C:\\Users\\arno_\\Downloads\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe'

bodyParts = [
        "Alexander De Croo", "Bart De Wever", "Elio Di Rupo", "Maggie De Block", "Charles Michel",
        "Sophie Wilmès", "Paul Magnette", "Georges-Louis Bouchez", "Theo Francken", "Conner Rousseau",
        "Angela Merkel", "Barack Obama", "Emmanuel Macron", "Justin Trudeau", "Boris Johnson",
        "Joe Biden", "Donald Trump", "Vladimir Putin", "Jacinda Ardern", "Recep Tayyip Erdoğan",
        "Xi Jinping", "Jair Bolsonaro", "Narendra Modi", "Shinzo Abe", "Yasser Arafat",
        "Golda Meir", "Indira Gandhi", "Mahatma Gandhi", "Benazir Bhutto", "Fidel Castro",
        "Che Guevara", "Hugo Chávez", "Eva Perón", "Juan Perón", "François Mitterrand",
        "Helmut Kohl", "Konrad Adenauer", "Charles de Gaulle", "Tony Blair", "David Cameron",
        "Matteo Renzi", "Silvio Berlusconi", "Nicolas Sarkozy", "Theresa May", "Jacques Chirac",
        "Winston Churchill", "Franklin D. Roosevelt", "John F. Kennedy", "Ronald Reagan", "Nelson Mandela"
    ];


# Initialize the WebDriver
driver = webdriver.Chrome(service=Service(path), options=options)


def fetch_and_save_image(query):
    # driver.get(f"https://duckduckgo.com/?q=&(artiest)+{query}+portret&t=h_&iax=images&ia=images")
    driver.get(f"https://duckduckgo.com/?q={query}&t=h_&iax=images&ia=images")

    # Wait for the page to load and images to render
    time.sleep(5)  # Adjust the sleep time if necessary

    # Scroll down to load more images (for lazy-loading)
    driver.find_element(By.TAG_NAME, "body").send_keys(Keys.END)
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
        file_path = f"politiekers/{query.replace(" ", "_")}.png"
        with open(file_path, "wb") as file:
            file.write(response.content)

if __name__ == "__main__":
    for dier in bodyParts:
        fetch_and_save_image(dier)

# Close the browser
driver.quit()
