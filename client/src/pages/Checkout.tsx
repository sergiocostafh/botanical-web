
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, Trash2, CreditCard, Check, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Endereço de e-mail inválido"),
  address: z.string().min(5, "Endereço deve ter pelo menos 5 caracteres"),
  city: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres"),
  state: z.string().min(2, "Estado deve ter pelo menos 2 caracteres"),
  postalCode: z.string().min(8, "CEP deve ter pelo menos 8 caracteres"),
  cardName: z.string().min(3, "Nome no cartão deve ter pelo menos 3 caracteres"),
  cardNumber: z.string().min(16, "Número do cartão deve ter pelo menos 16 dígitos"),
  cardExpiry: z.string().min(5, "Data de expiração deve estar no formato MM/AA"),
  cardCvc: z.string().min(3, "CVC deve ter pelo menos 3 dígitos"),
});

const Checkout = () => {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const [step, setStep] = useState<'cart' | 'address' | 'payment' | 'confirmation'>('cart');
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      cardName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
    },
  });

  const delivery = 15.00; // Taxa de entrega fixa
  const total = subtotal + delivery;

  const handleNextStep = () => {
    if (step === 'cart') {
      if (items.length === 0) {
        toast.error("Seu carrinho está vazio");
        return;
      }
      setStep('address');
    } else if (step === 'address') {
      setStep('payment');
    } else if (step === 'payment') {
      // Processo de pagamento simulado
      setTimeout(() => {
        setStep('confirmation');
        clearCart();
      }, 1500);
    }
  };

  const handlePrevStep = () => {
    if (step === 'address') {
      setStep('cart');
    } else if (step === 'payment') {
      setStep('address');
    }
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Formulário enviado:", values);
    toast.success("Pedido finalizado com sucesso!");
    // Em um cenário real, aqui seria enviado para a API de pagamento
    handleNextStep();
  };

  const goToHome = () => {
    navigate('/');
  };

  if (items.length === 0 && step === 'cart') {
    return (
      <div className="min-h-screen bg-botanical-white">
        <Header />
        <div className="botanical-container py-32 text-center">
          <h2 className="font-playfair text-3xl mb-4">Seu carrinho está vazio</h2>
          <p className="mb-8 text-botanical-dark/70">Adicione produtos ao seu carrinho para continuar comprando.</p>
          <Link to="/#shop" className="botanical-button-primary inline-flex items-center mt-4">
            <ArrowLeft className="mr-2 h-5 w-5" /> Ir para loja
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-botanical-white">
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="botanical-container max-w-5xl mx-auto">
          <Link to="/" className="inline-flex items-center text-botanical-olive hover:text-botanical-dark mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-5 w-5" /> Voltar para o site
          </Link>
          
          {/* Barra de progresso */}
          <div className="mb-10">
            <div className="flex justify-between items-center">
              <div className={`flex flex-col items-center ${step === 'cart' ? 'text-botanical-olive' : 'text-botanical-dark/70'}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step === 'cart' ? 'bg-botanical-olive text-white' : 'bg-botanical-beige/50'}`}>
                  1
                </div>
                <span className="text-sm mt-1">Carrinho</span>
              </div>
              <div className={`h-1 flex-1 mx-2 ${step !== 'cart' ? 'bg-botanical-olive' : 'bg-botanical-beige/50'}`}></div>
              <div className={`flex flex-col items-center ${step === 'address' ? 'text-botanical-olive' : 'text-botanical-dark/70'}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step === 'address' ? 'bg-botanical-olive text-white' : step === 'cart' ? 'bg-botanical-beige/50' : 'bg-botanical-olive text-white'}`}>
                  2
                </div>
                <span className="text-sm mt-1">Endereço</span>
              </div>
              <div className={`h-1 flex-1 mx-2 ${step === 'payment' || step === 'confirmation' ? 'bg-botanical-olive' : 'bg-botanical-beige/50'}`}></div>
              <div className={`flex flex-col items-center ${step === 'payment' ? 'text-botanical-olive' : 'text-botanical-dark/70'}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step === 'payment' ? 'bg-botanical-olive text-white' : step === 'confirmation' ? 'bg-botanical-olive text-white' : 'bg-botanical-beige/50'}`}>
                  3
                </div>
                <span className="text-sm mt-1">Pagamento</span>
              </div>
              <div className={`h-1 flex-1 mx-2 ${step === 'confirmation' ? 'bg-botanical-olive' : 'bg-botanical-beige/50'}`}></div>
              <div className={`flex flex-col items-center ${step === 'confirmation' ? 'text-botanical-olive' : 'text-botanical-dark/70'}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step === 'confirmation' ? 'bg-botanical-olive text-white' : 'bg-botanical-beige/50'}`}>
                  4
                </div>
                <span className="text-sm mt-1">Confirmação</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-botanical-beige/50 p-6">
            {step === 'cart' && (
              <div>
                <h2 className="font-playfair text-2xl mb-6 text-botanical-dark">Seu Carrinho</h2>
                
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center border-b border-botanical-beige/30 pb-4">
                      <div className="h-20 w-20 flex-shrink-0 rounded overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow ml-4">
                        <Link to={`/produto/${item.id}`} className="font-medium hover:text-botanical-olive text-botanical-dark transition-colors">
                          {item.name}
                        </Link>
                        <p className="text-botanical-olive font-playfair">R$ {item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center ml-4">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-botanical-dark hover:bg-botanical-beige/20 rounded transition-colors"
                        >
                          -
                        </button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-botanical-dark hover:bg-botanical-beige/20 rounded transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <div className="ml-4 text-right min-w-[80px]">
                        <p className="font-medium text-botanical-dark">R$ {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Remover item"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 border-t border-botanical-beige/30 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-botanical-dark/70">Subtotal</span>
                    <span className="font-medium">R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-botanical-dark/70">Entrega</span>
                    <span className="font-medium">R$ {delivery.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-medium mt-2 pt-2 border-t border-botanical-beige/30">
                    <span>Total</span>
                    <span className="text-botanical-olive">R$ {total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <Link to="/#shop" className="botanical-button-secondary inline-flex items-center">
                    <ArrowLeft className="mr-2 h-5 w-5" /> Continuar comprando
                  </Link>
                  <button 
                    onClick={handleNextStep}
                    className="botanical-button-primary"
                  >
                    Prosseguir para entrega
                  </button>
                </div>
              </div>
            )}
            
            {step === 'address' && (
              <div>
                <h2 className="font-playfair text-2xl mb-6 text-botanical-dark">Endereço de Entrega</h2>
                
                <Form {...form}>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome completo</FormLabel>
                            <FormControl>
                              <Input placeholder="Nome completo" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                              <Input placeholder="seu@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Endereço</FormLabel>
                          <FormControl>
                            <Input placeholder="Rua, número, complemento" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cidade</FormLabel>
                            <FormControl>
                              <Input placeholder="Cidade" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estado</FormLabel>
                            <FormControl>
                              <Input placeholder="Estado" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem className="md:col-span-1 col-span-2">
                            <FormLabel>CEP</FormLabel>
                            <FormControl>
                              <Input placeholder="00000-000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
                
                <div className="flex justify-between mt-8">
                  <button 
                    onClick={handlePrevStep}
                    className="botanical-button-secondary inline-flex items-center"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" /> Voltar ao carrinho
                  </button>
                  <button 
                    onClick={handleNextStep}
                    className="botanical-button-primary"
                  >
                    Prosseguir para pagamento
                  </button>
                </div>
              </div>
            )}
            
            {step === 'payment' && (
              <div>
                <h2 className="font-playfair text-2xl mb-6 text-botanical-dark">Pagamento</h2>
                
                <div className="mb-6 p-4 bg-botanical-beige/20 rounded-lg">
                  <h3 className="font-medium mb-2 text-botanical-dark">Resumo do pedido</h3>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-botanical-dark/70">{items.length} item(s)</span>
                    <span className="font-medium">R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-botanical-dark/70">Entrega</span>
                    <span className="font-medium">R$ {delivery.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-botanical-olive font-medium mt-2 pt-2 border-t border-botanical-beige/50">
                    <span>Total</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <h3 className="font-medium text-botanical-dark flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" /> Dados do cartão
                    </h3>
                    
                    <FormField
                      control={form.control}
                      name="cardName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome no cartão</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome como aparece no cartão" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número do cartão</FormLabel>
                          <FormControl>
                            <Input placeholder="0000 0000 0000 0000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="cardExpiry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data de expiração</FormLabel>
                            <FormControl>
                              <Input placeholder="MM/AA" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cardCvc"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVC</FormLabel>
                            <FormControl>
                              <Input placeholder="000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <button 
                        type="button"
                        onClick={handlePrevStep}
                        className="botanical-button-secondary inline-flex items-center"
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" /> Voltar ao endereço
                      </button>
                      <Button 
                        type="submit"
                        className="botanical-button-primary bg-botanical-olive hover:bg-botanical-olive/90"
                      >
                        Finalizar compra
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}
            
            {step === 'confirmation' && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-botanical-olive text-white mb-4">
                  <BadgeCheck className="h-8 w-8" />
                </div>
                <h2 className="font-playfair text-2xl mb-4 text-botanical-dark">Pedido Confirmado!</h2>
                <p className="text-botanical-dark/70 mb-8 max-w-lg mx-auto">
                  Obrigado pela sua compra. Você receberá um e-mail de confirmação com os detalhes do seu pedido em breve.
                </p>
                <Button 
                  onClick={goToHome}
                  className="botanical-button-primary bg-botanical-olive hover:bg-botanical-olive/90"
                >
                  Voltar para o início
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
