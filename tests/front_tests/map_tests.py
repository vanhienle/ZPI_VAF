from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Firefox()

driver.get("https://assistant.westeurope.cloudapp.azure.com/login")

map_button = driver.find_element(By.ID, "map_button")

city_input = driver.find_element(By.ID, "city_input")
filter_field = driver.find_element(By.ID, "filter_field")
filter_choose_input = driver.find_element(By.ID, "filter_choose_input")
choose_place = driver.find_element(By.ID, "choose_place")
click_link = driver.find_element(By.ID, "click_link")

city_input.sendKeys("Gdynia")
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
