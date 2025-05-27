import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { CheckCircle2, Edit, Edit2, Pencil, Plus, Trash2, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import axios from 'axios';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';


type MyCar = {
  id: number;
  title?: string | undefined;
  brand: string;
  model: string;
  user_id: number;
  // user:{
  //     id:number;
  //     name:string;
  // }
}

type Brand = {
  id: number;
  name: string;
}

type CarModel = {
  id: number;
  model: string;
  brand_id: number;
}

type Props = {
  mycars: MyCar[];
  brands: Brand[];
  models: CarModel[];
  flash?: {
      success?: string;
      error?: string;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Car',
        href: '/my-car',
    },
];

const MyCarPage = ({ mycars, brands, flash }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
    const [editingCar, setEditingCar] = useState<MyCar | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [selectedBrand, setSelectedBrand] = useState<number | ''>('');
    const [carModelDropdown, setCarModelDropdown] = useState<CarModel[]>([]);
    const [selectedCarModelDropdown, setSelectedCarModelDropdown] = useState<number | ''>('');

  // console.log(mycars[0].model.model);
  useEffect(() => {
        // console.log('asdasd');
        if (flash?.success) {
            setToastMessage(flash.success);
            setToastType('success');
            setShowToast(true);
            // console.log('success');
        } else if (flash?.error) {
            setToastMessage(flash.error);
            setToastType('error');
            setShowToast(true);
            // console.log('error');
        }
    }, [flash]);
  
    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);
  
    const { data, setData, post, put, processing, reset, delete: destroy } = useForm({
      title: '',
      brand: '',
      model: '',
    });
  
   // When country changes → fetch states
  useEffect(() => {
    if (data.brand) {
      axios
        .post('/my-car/get-carmodels', { brand_id: data.brand })
        .then((response) => {
          // console.log(response)
          setCarModelDropdown(response.data)
          setData('model', '') // reset state selection
        })
        .catch((error) => {
          console.error('Error fetching states:', error)
          setCarModelDropdown([])
        })
    } else {
      setCarModelDropdown([])
      setData('model', '')
    }
  }, [data.brand]);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (editingCar) {
          put(route('mycar.update', editingCar.id), {
              onSuccess: () => {
                  setIsOpen(false);
                  reset();
                  setEditingCar(null);
              },
          });
      } else {
          post(route('mycar.store'), {
              onSuccess: () => {
                  setIsOpen(false);
                  reset();
              },
          });
      }
  };

  const handleView = (car: MyCar) => {
    router.get(route('mycar.details.index', car.id));
  };

  // const handleEdit = (car: MyCar) => {
  //   setEditingCar(car);
  //       // console.log('model',editingModel);
  //       setData({
  //           title: car.title,
  //           brand: car.brand,
  //           model: car.model,
  //       });
  //       setIsOpen(true);
  // };

  const handleDelete = (carId: number) => {
      destroy(route('mycar.destroy', carId));
  };

  
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title='My Cars' />
      <div className='flex h-full flex-1 flex-col gap-4 rounded-xl p-4'>
      {showToast && (
            <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg p-4 shadow-lg ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white animate-in fade-in slide-in-from-top-5`}>
                {toastType === 'success' ? (
                    <CheckCircle2 className='h-5 w-5'/>
                ): (
                    <XCircle className='h-5 w-5'/>
                )}
                <span>{toastMessage}</span>
            </div>
        )}
        <div className="flex justify-between items-center">
          <div>
              <h1 className="text-3xl font-bold tracking-tight">My Collections</h1>                        
              <p className="text-muted-foreground mt-1">Manage your cars and stay organized</p>                    
          </div>             
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger>
                  <a href="#" className="bg-primary hover:bg-primary/90 text-white shadow-lg px-5 py-2 rounded-sm">
                      Add Your Car
                  </a>
              </DialogTrigger>                        
              <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                      <DialogTitle className="text-xl">{editingCar ? 'Edit Record' : 'Add New Car'}</DialogTitle> 
                      <DialogDescription>Here you can add your new car</DialogDescription>                           
                  </DialogHeader>                            
                  <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                          <Label htmlFor="title">Your Car Name</Label>                                    
                          <Input id="title"
                              value={data.title}
                              onChange={(e) => setData('title', e.target.value)}
                              required className="focus:ring-2 focus:ring-primary"
                          />
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="brand_id">Brand</Label>                                    
                          <Select value={data.brand}
                          onValueChange={(value:string) => setData('brand', value)}
                          >
                              <SelectTrigger className="focus:ring-2 focus:ring-primary">
                                  <SelectValue placeholder="Select a car brand" />
                              </SelectTrigger>                                        
                              <SelectContent>
                                  {brands.map((brand) => (
                                      <SelectItem key={brand.id} value={brand.id.toString()}>
                                          {brand.name.toUpperCase()}
                                      </SelectItem>))}
                              </SelectContent>                                    
                          </Select>                                
                      </div> 
                      <div className="space-y-2">
                          <Label htmlFor="brand_id">Car Models</Label>                                    
                          <Select value={data.model}
                            onValueChange={(value: string) => setData('model', value)}
                            disabled={!carModelDropdown.length}
                          >
                              <SelectTrigger className="focus:ring-2 focus:ring-primary">
                                  <SelectValue placeholder="Select a list" />
                              </SelectTrigger>                                        
                              <SelectContent>
                                  {carModelDropdown.map((model) => (
                                      <SelectItem key={model.id} value={model.id.toString()}>
                                          {model.model}
                                      </SelectItem>))}
                              </SelectContent>                                    
                          </Select>                                
                      </div> 
                      <Button
                          type="submit"
                          disabled={processing}
                          className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg"
                          >
                          {editingCar ? 'Update' : 'Create'}
                      </Button>
                  </form>
              </DialogContent>                    
          </Dialog> 
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mycars.map((car) => (
            // <div>{ car.title}</div>
                <Card key={car.id} className="hover:bg-accent/50 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">{car.title}</CardTitle>
                    <div className="flex gap-2">
                        <Button variant="ghost"
                            size="icon"
                            onClick={() => handleView(car)}
                        >
                            <Edit className="h-4 w-4" />
                  </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(car.id)}
                            className="text-destructive hover:text-destructive/90"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                  </CardHeader>                            
                  <CardContent>
                      <p className="text-sm text-muted-foreground">
                          {car.model || 'No description'}
                      </p>
                  </CardContent>                        
                </Card>
              ))}
          </div>
      </div>
    </AppLayout>
  )
}

export default MyCarPage