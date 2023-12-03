const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')

const args = process.argv.slice(2)
const [componentName] = args;

const directoryPath = path.join(__dirname,`/src/components/QuestionComponents/${componentName}`)
const templateFilePath = path.join(__dirname, '/src/components/QuestionComponents/template/')

function writeFileAsync(pathName, templateName) {
    return new Promise((resolve, reject) => {
        const filePath=path.join(directoryPath, pathName)
        const templateSource=fs.readFileSync(templateFilePath+templateName, 'utf8')
        if (pathName==='PropComponent.tsx') console.log(templateSource)
        const template=Handlebars.compile(templateSource)
        const content=template({ componentName })
        fs.writeFile(filePath, content, (err) => {
            if (err) {
                reject(err);
            } else {
                console.log('文件已创建: ' + filePath);
                resolve()
            }
        });
    });
}

fs.mkdir(directoryPath, {recursive:true},async (err)=>{
    if(err){
        return console.error(err)
    }
    console.log('创建目录成功！');

    const files = [
        {path:'Component.tsx',template:'Component.txt'},
        {path:'index.ts',template:'index.txt'},
        {path:'interface.ts',template:'interface.txt'},
        {path:'PropComponent.tsx',template:'PropComponent.txt'}
    ]

    const writeOperations = files.map(file => writeFileAsync(file.path, file.template));
    await Promise.all(writeOperations).then(()=>{
        console.log('所有文件创建成功!')
    }).catch((err)=>{
        console.error(err)
    })
})
