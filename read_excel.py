import pandas as pd
import sys

xl = pd.ExcelFile('c:/Users/fridh/OneDrive/Bureau/baazarnet/LIVRABLES_BAAZAARNET/01_Documentation/Matrice_Tracabilite.xlsx')
print('SHEETS:', xl.sheet_names)

for sheet in xl.sheet_names:
    print(f'\n=== {sheet} ===')
    df = pd.read_excel(xl, sheet_name=sheet)
    print(df.to_string())
