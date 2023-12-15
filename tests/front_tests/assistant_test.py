from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Firefox()

driver.get("https://iaff.nocservice.biz/assistant")

first_question_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[1]/div/div[1]/div[2]/div[2]/div/button[1]')
input_question = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[2]/div[1]/textarea')
send_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[2]/svg')
language_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[2]/div[2]/div/button')
polish_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[2]/div[2]/div[2]/div[5]/button')


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
