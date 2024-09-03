def up_or_down(data):

    aliveData = 0
    offlineData = 0
    
    if not data:
        return 'DOWN' #Should be either UP or DOWN.

    for item in data:
        if(item[0] == 0):
            aliveData += 1

        if(item[0] == 1):
            offlineData += 1

    if(offlineData > 0 and offlineData < aliveData):
        totalHostPings = offlineData + aliveData
        if((aliveData / totalHostPings) * 100 >= 70):
            return('UP')

    if(offlineData == 0 and aliveData > 0):
        return('UP')

    return('DOWN')

# Export the function
__all__ = ['up_or_down']
