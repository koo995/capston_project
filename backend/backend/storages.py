from storages.backends.azure_storage import AzureStorage
# 이거에 대한 설명이 아무곳에도 없네...

class StaticAzureStorage(AzureStorage):
    azure_container = "static"


class MediaAzureStorage(AzureStorage):
    azure_container = "media"
    