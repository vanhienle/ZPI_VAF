from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Firefox()

driver.get("https://assistant.westeurope.cloudapp.azure.com/login")

doc_button = driver.find_element(By.ID, "doc_button")
student_button = driver.find_element(By.ID, "student_button")
insurance_button = driver.find_element(By.ID, "insurance_button")
refugee_button = driver.find_element(By.ID, "refugee_button")
citizenship_button = driver.find_element(By.ID, "citizenship_button")
cards_button = driver.find_element(By.ID, "cards_button")
parents_button = driver.find_element(By.ID, "parents_button")
first_block_button = driver.find_element(By.ID, "first_block_button")
input_filter = driver.find_element(By.ID, "input_filter")
first_search_result = driver.find_element(By.ID, "first_search_result")


def filter_input():
    input_filter.sendKeys("cards")
    time.sleep(1)

'''
parents_button.click()
time.sleep(1)
cards_button.click()
time.sleep(1)
citizenship_button.click()
time.sleep(1)
refugee_button.click()
time.sleep(1)
insurance_button.click()
time.sleep(1)
student_button.click()
time.sleep(1)
first_block_button.click()
time.sleep(1)
filter_input()
time.sleep(1)
first_search_result.click()
time.sleep(1)
'''

driver.quit()
