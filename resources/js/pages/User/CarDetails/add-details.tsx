import AppLayout from '@/layouts/app-layout'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { Check, ChevronsUpDown } from 'lucide-react';
import RSelect from 'react-select'

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]

type Option = {
    value: number
  label: string
}

type CarRecords = {
    id: number;
    current_mileage: string;
    date_of_service: Date;
    mycar_id: number;
}

type CarMaintenance = {
    id: number;
    mileage: string;
    item: string;
    quantity: number;
    price: number;
    model_id: number;
}

type Props = {
    // mycar: MyCar;
    carrecords: CarRecords[];
    services: CarMaintenance[];
    flash?: {
        success?: string;
        error?: string;
    };
}

const AddDetailsPage = ({ carrecords, services, flash }: Props) => {
    console.log(services);
     const [isOpen, setIsOpen] = useState(false);
            const [editingService, setEditingService] = useState<CarRecords | null>(null);
            const [showToast, setShowToast] = useState(false);
            const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    
    const itemOptions: Option[] = services.map((service) => ({
        value: service.id,
        label: service.item
    }))

     const { data, setData, post, put, processing, reset, delete: destroy } = useForm({
              current_mileage: '',
              date_of_service: '',
              item: '',
              price: 0,
              quantity: 0,
        });

     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
            //   if (editingCar) {
            //       put(route('mycar.update', editingCar.id), {
            //           onSuccess: () => {
            //               setIsOpen(false);
            //               reset();
            //               setEditingCar(null);
            //           },
            //       });
            //   } else {
            //       post(route('mycar.store'), {
            //           onSuccess: () => {
            //               setIsOpen(false);
            //               reset();
            //           },
            //       });
            //   }
    };
    
  return (
    <AppLayout>
        <div className='flex h-full flex-1 flex-col gap-4 rounded-xl p-4 w-1/2'>
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Add your service details</h1>                        
                    <p className="text-muted-foreground mt-1"></p>  
                </div> 
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current_mileage">Current Mileage (km)</Label>                                    
                                    <Input id="current_mileage"
                                        value={data.current_mileage}
                                        onChange={(e) => setData('current_mileage', e.target.value)}
                                        required className="focus:ring-2 focus:ring-primary"
                                    />
                              </div>
                              <div className="space-y-2">
                                    <Label htmlFor="date_of_service">Date of Services</Label>                                    
                                    <Input id="date_of_service"
                                        type="date"
                                        value={data.date_of_service}
                                        onChange={(e) => setData('date_of_service', e.target.value)}
                                        className="focus:ring-2 focus:ring-primary w-auto"
                                    />
                              </div>
                  <div className="space-y-2">
                      
                  <RSelect options={itemOptions} placeholder="Search categories..."/>
                              </div>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg"
                                    >
                                    {editingService ? 'Update' : 'Create'}
                                </Button>
                            </form>
        </div>
    </AppLayout>
  )
}

export default AddDetailsPage