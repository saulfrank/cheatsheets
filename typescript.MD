### Typescript examples
```shell script
npm install -g typescript

# create a javascript file
tsc typescript/example1.ts
tsc typescript/example2.ts --alwaysStrict


# watch a typescript file and compile
tsc -w -p .
node typescript/example1.js
```

### Typescript with React
* https://fettblog.eu/typescript-react/components/
```typescript jsx
// passing props to function in react
const TableBody = props => {
    
    interface row {
        name:string,
        job: string
    }
    // alternative for row to interface above
    const rows = props.characterData.map((row:{name:string, job:string}, index:number) => {

        return (
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.job}</td>
            </tr>
        )
    });

    return <tbody>{rows}</tbody>
}
```