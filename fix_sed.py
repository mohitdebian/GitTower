with open('app/page.tsx', 'r') as f:
    c = f.read()
c = c.replace(" */ }}", "}}")
c = c.replace("/* ", "")
c = c.replace("*/ ", "")
with open('app/page.tsx', 'w') as f:
    f.write(c)
