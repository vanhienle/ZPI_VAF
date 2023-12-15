from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Firefox()

driver.get("https://iaff.nocservice.biz/documents")

student_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[5]/div[1]/p[1]')
insurance_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[5]/div[1]/p[2]')
refugee_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[5]/div[1]/p[3]')
citizenship_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[5]/div[1]/p[4]')
cards_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[5]/div[1]/p[5]')
parents_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[5]/div[1]/p[6]')
first_block_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[5]/div[2]/a[1]/div')
input_filter = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[2]/div/div[1]/input')
first_search_result = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[2]/div/div[2]/div/a[1]')


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
