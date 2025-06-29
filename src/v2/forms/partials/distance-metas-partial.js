import { Button, FormControl, FormLabel, Input, Textarea, VStack, UnorderedList } from '@chakra-ui/react';
import { FieldGroup } from '../../../chakra'
import Datepicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

export const DistanceMetasPartial = ({
    metas,
    handleAddIds,
    handleRemoveId,
    setMetas,
    setTypeId,
    typeId,
}) => {

    return (
        <FieldGroup title="Metas">
            <VStack width="full" spacing="6">

                <FormControl id="parent">
                    <FormLabel htmlFor="parent">Parent ID</FormLabel>
                    <Input 
                        onChange={e => setMetas({ ...metas, parent: e.currentTarget.value })}
                        value={metas?.parent || ""}
                    />
                </FormControl>
                
                <FormControl id="title">
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input 
                        onChange={e => setMetas({ ...metas, title: e.currentTarget.value })}
                        value={metas?.title || ""}
                    />
                </FormControl>
                <FormControl id="subtitle">
                    <FormLabel htmlFor="subtitle">Subtitle</FormLabel>
                    <Input  
                        onChange={e => setMetas({ ...metas, subtitle: e.currentTarget.value })} 
                        value={metas?.subtitle || ""} 
                    />
                </FormControl>
                <FormControl id="description">
                    <FormLabel htmlFor="description">Description</FormLabel>
                        <Textarea 
                            onChange={e => setMetas({ ...metas, description: e.currentTarget.value })}
                            value={metas?.description || ""} 
                            rows={4} 
                        />
                </FormControl>
                <FormControl id="storyline">
                    <FormLabel htmlFor="storyline">Storyline</FormLabel>
                        <Textarea 
                            value={metas?.storyline || ""} 
                            onChange={e => setMetas({ ...metas, storyline: e.currentTarget.value })}
                            rows={4} 
                        />
                </FormControl>
                <FormControl>
                    <FormLabel w="100%" htmlFor="starts">Starts</FormLabel>
                    <Datepicker 
                        id="starts"
                        dateFormat="Pp"     
                        timeFormat="p"    
                        showTimeSelect                           
                        selected={metas.starts}
                        style={{background: '#FFF', color: '#333 !important'}}
                        onChange={time => setMetas({ ...metas, starts: time })}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="ends">Ends</FormLabel>
                    <Datepicker 
                        id="ends"
                        dateFormat="Pp"     
                        timeFormat="p"    
                        showTimeSelect                           
                        selected={new Date(metas.ends)}
                        style={{background: '#FFF', color: '#333 !important'}}
                        onChange={time => setMetas({ ...metas, ends: time })}
                        />
                </FormControl>
                <FormControl required id="typeId">
                    <FormLabel htmlFor="typeId">Type IDs</FormLabel>
                    <Input 
                        value={typeId} 
                        onChange={e => setTypeId(e.currentTarget.value)} 
                    />
                    <Button 
                        minW="50%" 
                        m="2" 
                        onClick={handleAddIds}
                        isDisabled={!typeId}
                    >
                        Add
                    </Button>
                </FormControl>
                <UnorderedList>
                    {metas.typeIds.map( id => 
                        <li 
                            id={id} 
                            style={{cursor: 'pointer'}} 
                            onClick={handleRemoveId} 
                            key={id}
                        >
                            {id}
                        </li>
                    )}
                </UnorderedList>
            </VStack>
        </FieldGroup>
    )
}