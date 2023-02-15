import React, {useState} from "react"
import {InputLabel, FormControl, Select, MenuItem, IconButton, TextField} from '@mui/material';
import { BlockPicker} from 'react-color';

interface props {
    downloadFormat: string
    color: string,
    downloadDimensions: {width:string, height:string},
    changeFileFormat: any,
    changeColor: any,
    changeDownloadDimensions: any
}

export default function GeneratorSettings(props: props) {

    const {downloadFormat, color, downloadDimensions, changeFileFormat, changeColor, changeDownloadDimensions} = props;

    //Default color options provided by blockpicker
    const colors = ["#000000", "#FFFFFF", "#DC143C", "#00CD00", "#FF8C00", "#009ACD"];

    return (
        // style={{backgroundColor: "#EFEFEF", border: "2px solid black", width: "100%", borderRadius: "0.3em", display: "flex", margin: "0 0 1em 0"}}
        <nav className="w-full flex bg-[#EFEFEF] border-2 border-black rounded-md">

            {/* All inputs except color picker. */}
            {/* sm:flex-wrap md:flex-nowrap */}
            <div className="w-full flex  sm:flex-wrap md:flex-nowrap gap-y-3 gap-x-4 mt-3 mb-4 mx-3">
                
                {/* Form selectors */}
                <div className="flex flex-col gap-x-4 gap-y-3 w-1/2">
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

                    <TextField type="number" label="Width" defaultValue={downloadDimensions.width} inputProps={{autoFocus: true}} 
                        onChange={event => changeDownloadDimensions(() => {return {width: event.target.value, height: downloadDimensions.height}})}/>

                    <TextField type="number" label="Height" defaultValue={downloadDimensions.height} inputProps={{autoFocus: true}} 
                        onChange={event => changeDownloadDimensions(() => {return {width: downloadDimensions.width, height: event.target.value}})}/>

                </div>
            
                {/*  */}
                {/* style={{margin: "0.75em 0.75em 0.5em 0", height: "100%", display: "flex", justifyContent: "center", flexGrow: "2"}} */}
                <div className="h-full w-1/2 min-w-max">
                    <BlockPicker width="100%" triangle="hide" color={color} colors={colors} onChange={(color:any, event:any) => 
                    changeColor(color.hex)}/>
                </div>
            </div>
        </nav>
    );
}