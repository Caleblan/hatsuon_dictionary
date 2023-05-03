// MUI / React
import React, {useState} from "react"
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// Icons
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
// Third-party
import { BlockPicker} from 'react-color';

interface props {
    downloadFormat: string
    color: string,
    downloadDimensions: {width:number, height:number},
    changeFileFormat: any,
    changeColor: any,
    changeDownloadDimensions: any
}

export default function GeneratorSettings(props: props) {

    const {downloadFormat, color, downloadDimensions, changeFileFormat, changeColor, changeDownloadDimensions} = props;

    //Default color options provided by blockpicker
    const colors: string[] = ["#000000", "#FFFFFF", "#DC143C", "#00CD00", "#FF8C00", "#009ACD"];

    return (
        // style={{backgroundColor: "#EFEFEF", border: "2px solid black", width: "100%", borderRadius: "0.3em", display: "flex", margin: "0 0 1em 0"}}
        <nav className="w-full flex flex-wrap sm:flex-nowrap gap-y-3 gap-x-4 pt-3 pb-4 px-3 bg-[#EFEFEF] border-2 border-black rounded-md">
                
            {/* Form selectors */}
            <div className="flex flex-col gap-x-4 gap-y-3 w-full">
                <FormControl className="flex">
                    <InputLabel>Download Format</InputLabel>
                    <Select
                    defaultValue={"PNG"}
                    value={downloadFormat}
                    onChange={event => changeFileFormat(event.target.value)}
                    >
                        <MenuItem value={"PNG"}>PNG</MenuItem>
                        <MenuItem value={"SVG"}>SVG</MenuItem>
                    </Select>
                </FormControl>

                <TextField className="w-full" type="number" label="Width" defaultValue={downloadDimensions.width} InputLabelProps={{ shrink: true}}
                    onChange={ (event:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        // Prevents negative numbers
                        const value: string = event.target.value.match(/^[0-9]+$/) == null ? 
                        (event.target.value = String(0))
                        : event.target.value = String(Number(event.target.value))
                        changeDownloadDimensions(() => {return {width: Number(event.target.value) > 0 ? Number(value): 0, height: downloadDimensions.height}})}
                    }/>

                <TextField className="w-full" type="number" label="Height" defaultValue={downloadDimensions.height} 
                InputLabelProps={{ shrink: true}} InputProps={{ spellCheck: 'false' }}
                    onChange={(event:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        // Prevents negative numbers
                        const value: string = event.target.value.match(/^[0-9]+$/) == null ? 
                            (event.target.value = String(0))
                            : event.target.value = String(Number(event.target.value))
                        changeDownloadDimensions(() => {return {width: downloadDimensions.width, height: Number(event.target.value) > 0 ? Number(value): 0}})}
                    }/>
            </div>
        
            {/* Color Picker */}
            {/* style={{margin: "0.75em 0.75em 0.5em 0", height: "100%", display: "flex", justifyContent: "center", flexGrow: "2"}} */}
            <div className="h-full w-full min-w-max">
                <BlockPicker width="100%" triangle="hide" color={color} colors={colors} onChange={(color:any, event:any) => 
                changeColor(color.hex)}/>
            </div>
        </nav>
    );
}