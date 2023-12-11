from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Firefox()

driver.get("https://assistant.westeurope.cloudapp.azure.com/login")

home_button = driver.find_element(By.ID, "home_button")
question_input = driver.find_element(By.ID, "question_input")
ask_me_button = driver.find_element(By.ID, "ask_me_button")
first_question_button = driver.find_element(By.ID, "first_question_button")
first_banner_button = driver.find_element(By.ID, "first_banner_button")
login_banner_button = driver.find_element(By.ID, "login_banner_button")
signup_banner_button = driver.find_element(By.ID, "signup_banner_button")


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
