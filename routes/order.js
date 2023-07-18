router.get('/order', jwtAuthMiddleware, renderOrder);

router.get('/order/:stroe_id', jwtAuthMiddleware, renderOrderDetail);

router.get('/payment', jwtAuthMiddleware, renderPayment);
