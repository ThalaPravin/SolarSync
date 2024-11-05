import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";


export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
       <h1 > <b>EMS</b></h1>
    </Flex>
  );
}

export default SidebarBrand;
