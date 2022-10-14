import sharp from 'sharp'
import sizeOf from 'image-size'
import fs from 'fs';

export const compressImage = (path: string, filename: string, quality:number = 50, ajustImage?: boolean) => {
    const folder = './src/temp/optimized'
    const unnamedFileExtention = filename.split('.').slice(0, -1)

    if (ajustImage && (getWidthFromImage(path) > 1920) ) {
        return sharp(`${path}`, { failOnError: false }).webp({ quality, effort: 6 }).resize(1920).toFile(`${folder}/${unnamedFileExtention}.webp`)
    }

    return sharp(`${path}`, { failOnError: false }).webp({ quality, effort: 6 }).toFile(`${folder}/${unnamedFileExtention}.webp`)
}

export const getWidthFromImage = (path: string): number => {
	return (sizeOf(path).width as number)
}

export const removeDateSymbolFromName = (path: string, character:string = '-|-') => {
	return path.split(character).at(-1)
}

export const deleteFileFromPath = (path: string)=>{
    fs.unlink(path, (err) => {
        if (err) throw err
    })
}