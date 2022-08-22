/* eslint-disable no-console */
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "components";
import { Box, Button, Container, Typography, Avatar } from "@mui/material";
import { Layout } from "components/account";
import { userService, alertService } from "services";
import { useEffect, useState } from "react";
import { gsap } from "gsap";

const Login = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState();
  useEffect(() => {
    let timer;
    const aniStart = async () => {
      timer = setTimeout(() => {
        setIsActive(true);
        const tl = gsap.timeline();
        tl.to(".cover-strip", {
          yPercent: 100,
          duration: 0.8,
          ease: "Expo.easeInOut",
          stagger: 0.1,
        });
      }, 300);
    };
    const aniEnd = () => {
      if (timer) {
        clearTimeout(timer);
      }
      const tl = gsap.timeline();
      if (isActive) {
        tl.to(".cover-strip", {
          yPercent: 200,
          duration: 0.8,
          ease: "Expo.easeInOut",
          stagger: -0.1,
        });
        setIsActive(false);
      }
      tl.set(".cover-strip", {
        yPercent: 0,
      });
      clearTimeout(timer);
    };
    router.events.on("routerChangeStart", aniStart);
    router.events.on("routerChangeComplete", aniEnd);
    router.events.on("routerChangeError", aniEnd);

    return () => {
      router.events.off("routerChangeStart", aniStart);
      router.events.off("routerChangeComplete", aniEnd);
      router.events.off("routerChangeError", aniEnd);
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [router]);
  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Nim is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ username, password }) {
    return userService
      .login(username, password)
      .then(() => {
        // get return url from query parameters or default to '/'
        const returnUrl = "/";
        router.push(returnUrl);
      })
      .catch(alertService.error);
  }

  return (
    <Layout>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <div className="card">
            <Typography
              color="textPrimary"
              variant="h4"
              className="card-header"
            >
              Login
              <Typography color="textSecondary" gutterBottom variant="body2">
                Silakan login untuk mengakses siakad.
              </Typography>
            </Typography>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label>Nim</label>
                  <input
                    name="username"
                    type="text"
                    {...register("username")}
                    className={`form-control ${
                      errors.username ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.username?.message}
                  </div>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    name="password"
                    type="password"
                    {...register("password")}
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                </div>
                <button
                  disabled={formState.isSubmitting}
                  className="btn btn-primary"
                >
                  {formState.isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}
                  Login
                </button>
                <Link href="/account/register" className="btn btn-link">
                  Register
                </Link>
              </form>
            </div>
          </div>
        </Container>
      </Box>
    </Layout>
  );
};
export default Login;
