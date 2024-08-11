import React from 'react'

const Links = () => {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor="important links" value="Let the world connect with you (feel free to modify name and links)" />
      </div>     

      <div className="border-2 border-gray-600 rounded-lg md:p-3">
          <div className="flex w-full gap-1 ">
              <TextInput onChange={handleLinkInputChange} className="w-1/4 font-bold text-black" placeholder="Instagram" />
              <TextInput onChange={handleLinkInputChange} className="w-3/4" id="link1" type="text"  placeholder="Instagram account link" shadow />
          </div> 
          <div className="flex w-full gap-1 ">
              <TextInput onChange={handleLinkInputChange} className="w-1/4 font-bold text-black" placeholder="X" />
              <TextInput onChange={handleLinkInputChange} className="w-3/4" id="link1" type="text"  placeholder="x link" shadow />
          </div> 
          <div className="flex w-full gap-1 ">
              <TextInput onChange={handleLinkInputChange} className="w-1/4 font-bold text-black" placeholder="YouTube" />
              <TextInput onChange={handleLinkInputChange} className="w-3/4" id="link1" type="text"  placeholder="youtube channel link" shadow />
          </div> 
          <div className="flex w-full gap-1 ">
              <TextInput onChange={handleLinkInputChange} className="w-1/4 font-bold text-black" placeholder="Other" />
              <TextInput onChange={handleLinkInputChange} className="w-3/4" id="link1" type="text"  placeholder="other account link" shadow />
          </div> 
      </div>
    </div>
  )
}

export default Links