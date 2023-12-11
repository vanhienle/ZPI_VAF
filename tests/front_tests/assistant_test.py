from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Firefox()

driver.get("https://assistant.westeurope.cloudapp.azure.com/login")

assistant_button = driver.find_element(By.ID, "assistant_button")
first_question_button = driver.find_element(By.ID, "first_question_button")
input_question = driver.find_element(By.ID, "input_question")
send_button = driver.find_element(By.ID, "send_button")
language_button = driver.find_element(By.ID, "language_button")
polish_button = driver.find_element(By.ID, "polish_button")


def question_input_english():
    input_question.sendKeys("I want to get visa")
    time.sleep(1)


def question_input_polish():
    input_question.sendKeys("Chcę otrzymać wizę")
    time.sleep(1)


#question_input_english()
#time.sleep(1)
#send_button.click()
#time.sleep(1)
#language_button.click()
#time.sleep(1)
#polish_button.click()
#time.sleep(1)
#question_input_polish()
#time.sleep(1)
#send_button.click()
#time.sleep(1)

driver.quit()
