from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Firefox()

driver.get("https://iaff.nocservice.biz/map")

city_input = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[1]/div[1]/div/div[1]/input')
city_choice = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[1]/div[1]/div/div[1]/div/div/div')
filter_field = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[1]/div[1]/div/div[2]/input')
filter_choose_input = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[1]/div[1]/div/div[2]/div/div/div[6]')
choose_place = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[1]/div[2]/div/div[1]/div')
click_link = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[1]/div[2]/div/div[7]/a')

city_input.sendKeys("Gdynia")
time.sleep(2)
city_choice.click()
time.sleep(2)
filter_field.click()
time.sleep(2)
filter_choose_input.click()
time.sleep(2)
choose_place.click()
time.sleep(2)
click_link.click()
time.sleep(2)

driver.quit()
