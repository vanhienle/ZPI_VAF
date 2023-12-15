from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Firefox()

driver.get("https://iaff.nocservice.biz/")

home_button = driver.find_element(By.ID, "home_button")
question_input = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[3]/div/div[2]/input')
ask_me_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[3]/div/div[2]/button')
first_question_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[5]/div/button[1]/div')
first_banner_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[7]/div[1]/div[1]')
login_banner_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[9]/div/div[2]/a[1]')
signup_banner_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[9]/div/div[2]/a[2]')


def input_question():
    question_input.sendKeys("I want to get visa")
    time.sleep(1)


#input_question()
#time.sleep(1)
#ask_me_button.click()
#time.sleep(1)
#first_question_button.click()
#time.sleep(1)
#first_banner_button.click()
#time.sleep(1)
#login_banner_button.click()
#time.sleep(1)
#signup_banner_button.click()
#time.sleep(1)

driver.quit()
