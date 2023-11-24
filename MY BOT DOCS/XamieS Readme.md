THIS CONTAINS ALL THE CODE BLOK TO MAKE RUNNING MY BOT EASY 
 START OR INTIALIZE THE BOT 
sudo docker-compose up -d
sudo docker-compose down TO END IT
freqtrade trade --config user_data/config.json --strategy PowerTower
 specify the configfile
 specify the strategy 
 And make sure TG is active to receive commands 

UPDATE COMMANDS FOR DOCKER
sudo docker-compose run --rm freqtrade new-config --config user_data/config.json
# Download the latest image
docker compose pull
# Restart the image
docker compose up -d


 BAKTESTING A STRATEGY
 docker-compose run --rm freqtrade backtesting --config user_data/Futures-config.json --strategy FAdxSmaStrategy --timeframe 1h --timerange 20230405-20231110
 
 docker-compose run --rm freqtrade backtesting --config user_data/config.json --strategy E0V1E --timerange 20221115- 

 DOWNLOAD DATA POINTS
 docker-compose run --rm freqtrade download-data --exchange binance -c user_data/Futures-config.json --timerange 20230401-    --timeframes 5m
  docker-compose run --rm freqtrade download-data --exchange binance --pairs BTC/USDT:USDT --timerange 20230401- --timeframes 1d

determine the exchange 
the config file to be used 
the amount of days 
and lastly the timeframes to be used

HYPEROPTIMIZATION OF A STRATEGY

[1] PLOTTING 
PIP INSTALL HYPLOT
 Freqtrade plot-dataframe --strategy (any strategy of choice) -p [THE BEST PERFORMING PAIR]

[2] HYPEROPT METHOD
Freqtrade hyperopt --enable protections -- - --strategy (any strategy of choice) --hyperopt-loss [input the loss func file name] -i [the timeframe for the startegy] -e [this is the total no of iterations or rounds the machine learning will go through to find the best parameters e.g 10 ,50 best to use from 1000 to 6000 epochs to minimize losses to the bearest minimum]
make sure the config file is named config.json
freqtrade hyperopt --enable-protections --strategy PowerTower --hyperopt-loss WpH -i 5m -e 1000

docker-compose run --rm freqtrade hyperopt --enable-protections --strategy FAdxSmaStrategy  --config user_data/Futures-config.json --hyperopt-loss SortinoHyperOptLoss  -i 1h -e 2000

freqtrade hyperopt --enable-protections --strategy GodStra --hyperopt-loss ExpectancyHyperOptLoss -i 12h -e 1000
HYPEROPT TYPES
SharpHyperOptLos
OnlyProfit
SharpHyperOptLossDaily
SortinoHyperOptLoss
MaxDrawDownHyperOptLoss
CalmerHyperOptLoss
ProfitDrawDownHyperOptLoss = BEST TO TEST
# THIS IS THE CODE REQUIRED TO RUN TRAILING STOPLOSS 
# WITH THE REQUIRED IMPORTS
# use_custom_stoploss = True
 


# def custom_stoploss(self, pair: str, trade: 'Trade', current_time: datetime, current_rate: float, current_profit: float, **kwargs) -> float:
     
#     sl_new = 1
#  from freqtrade.persistence import Trade
# from datetime import datetime, timedelta
#     if (current_time - timedelta(minutes=15) >= trade.open_date_utc):
 
#         dataframe, _ = self.dp.get_analyzed_dataframe(pair, self.timeframe)
#         current_candle = dataframe.iloc[-1].squeeze()
#         current_profit = trade.calc_profit_ratio(current_candle['close'])
 
#         if (current_profit >= 0.03):
#             sl_new = 0.01
 
    # return sl_new

  OR
  BUT NOT BACKTEST FRIENDLY
  
  minimal_roi = {
    "0": 0.05
}
  trailing_stop = True
trailing_stop_positive = 0.01
trailing_stop_positive_offset = 0.03
trailing_only_offset_is_reached = True

Sometimes, there are times when a trade almost reach your roi level, but then it stop rise up and start to go down and ends up triggering stoploss. That’s where trailing stoploss (I’m gonna refer to it as tsl throughout this article) helps you. You can see minimal roi as the preferred profit target, and tsl as a minimum profit target. For example, let’s see this code

5% is the preferred profit target. But you set the minimum profit target at (around) 3-1 = 2% profit target. Of course the profit have to at least reached 3% before the trailing activated and the 2% profit locked in.

The issue with the code above is it introduced backtest trap. You can read it more here. So personally, I prefer using custom_stoploss function, which look like the code below

The code above will make sure the tsl is backtest-able. The tsl will only start to be checked once the trade duration past the open candle (in this case 15 mins), and current_profit is tied to last candle’s close value. The full code will look like this (don’t forget to copy the import lines, because there are new import lines)

